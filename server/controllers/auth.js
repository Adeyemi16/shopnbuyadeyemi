import bcrypt, { compareSync } from 'bcrypt'
import User from "../models/auth.js";
import { customError } from "../config/error.js";
import generateToken from '../config/token.js';

export const registerUser = async (req, res, next) => {
    const { email, username, password, profileImg } = req.body;

    try {
        //check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) return next(customError(404, "User already exists"));
        //encrypt password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        //create new user
        
        const newUser = await User.create({
            username,
            email,
            password: passwordHash,

            profileImg: profileImg || 'https://res.cloudinary.com/ceenobi/image/upload/v1687743800/icon-256x256_d7vo98.png'
        })
        const user = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profileImg: newUser.profileImg
        }

        const access_token = generateToken(user._id)
        res.status(201).json({ access_token, user, msg: 'User registration successful' })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const loginUser = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const userExists = await User.findOne({ username })
        if (!userExists) return next(customError(400, "User not found"))
        const isPasswordMatch = await bcrypt.compare(password, userExists.password)
        if (!isPasswordMatch) return next(customError(400, "Invalid Pasword"));
        const user = {
            _id: userExists._id,
            username: userExists.username,
            email: userExists.email,
            profileImg: userExists.profileImg,
            isAdmin: userExists.isAdmin,
        }

        const access_Token = generateToken(userExists._id);
        res.status(200).json({ access_Token, user, msg: 'Login successful' });
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSingleUser = async (req, res, next) => {
    const { username } = req.params
    try {
        const user = await User.findOne({ username })
        if (!user) return next(customError(400, "Cant find user"))
        //spreading the items from user._doc
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateUser = async (req, res) => {
    const userId = await User.findById(req.user.id)
    const {username, email, password, profileImg} = req.body
    try {
        if (userId) {
            userId.username = username || userId.username
            userId.email = email || userId.email
            userId.profileImg = profileImg || userId.profileImg
            if (password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                if (hashedPassword) {
                    userId.password = hashedPassword
                }
            }
            else {
                userId.password = userId.password
            }
            
            const updatedUser = await userId.save()
            // const { password, ...user } = updatedUser._doc
            const user = {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                profileImg: updatedUser.profileImg,
                isAdmin: updatedUser.isAdmin,
                createdAt: updatedUser.createdAt,
            }
            console.log(user)
            const access_Token = generateToken(updatedUser._id)
            res.status(201).json({ access_Token, user, msg: "User profile updated" })
        }
        else {
            res.status(404)
            throw new Error("user profile not updated")
        }
    } catch (error) {
            res.status(500).json(error)
    }
}