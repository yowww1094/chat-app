import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    const {username, email, password, confirmPassword} = req.body;
    try {
        if(password === confirmPassword){
            const checkUsername = await User.findOne({username});
            if (checkUsername){
                return res.json({
                    message: "This User already exists!",
                    status: false
                });
            }
            const checkUserEmail = await User.findOne({email});
            if (checkUserEmail){
                return res.json({
                    message: "This Email already exists!",
                    status: false
                });
            }
                    
            const user = await User.create({
                    username, 
                    email,
                    password
            });

            return res.status(200).json({
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAvatarImageSet: user.isAvatarImageSet,
                    avatarImage: user.avatarImage
                },
                status: true
            });
        }
        return res.json({
            message: "Password and Password Confirmation are not the same!",
            status: false
        });

    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error,
            status: false
        });
    }
    
};

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.json({
                message: "Incorrect username or password!",
                status: false
            });
        }
        const passwordMatching = await bcrypt.compare(password, user.password);
        if(!passwordMatching){
            return res.json({
                message: "Incorrect username or password!",
                status: false
            });
        }
        return res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAvatarImageSet: user.isAvatarImageSet,
                avatarImage: user.avatarImage,
            },
            status: true
        })
    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error,
            status: false
        });
    }
};

const setAvatar = async (req, res) => {
    const {id} = req.params.id;
    const {image} = req.body;
    try {
        const user = await User.findById(id);
        if(!user) {
            return res.json({
                message: "User does not exist!",
                status: false
            })
        }
        const updatedUser = await User.findByIdAndUpdate(id, {
            isAvatarImageSet: true,
            avatarImage: image
        })
        return res.json({
            isSet: updatedUser.isAvatarImageSet,
            image: updatedUser.image
        })
    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error,
            status: false
        });
    }
}

const getAllUsers = async (req, res) => {
    const {id} = req.params;
    try {
        const users = await User.findAll({ _id: { $ne: id } }).select([
            "username", "email", "avatarImage", "_id"
        ]);
        return res.json({
            users,
        })
    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error,
            status: false
        });
    }
};

export {registerUser, loginUser, setAvatar, getAllUsers};