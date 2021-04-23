import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import mongoose from 'mongoose';

const secret = 'test';


export const signin =  async (req ,res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: 'Este usuario no existe.' });
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    
        if(!isPasswordCorrect) return res.status(400).json({ message: 'Contraseña incorrecta' });
    
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' } );

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error.' })
    }
};

export const signup =  async (req ,res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: 'Este usuario ya existe.' });

        if(password !== confirmPassword) return res.status(400).json({ message: 'Las contraseñas no coinciden.' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' } );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error.' });

        console.log(error);
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error});
    }
}

export const followUser = async (req, res) => {
    const { id } = req.params.id;
    const { idFollow } = req.params.idFollow

    if(!idFollow) return res.json({ message: 'No identificado.' })

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No se encuentra ningún user con ese id');

    const user = await User.findById(id);
    const userFollow = await User.findById(idFollow);

    const index = user.followers.findIndex((id) => id === String(idFollow));

    if(index === -1) {
        // follow user
        user.followers.push(idFollow);
        userFollow.following.push(id);
    } else {
        // unfollower user
        user.followers = user.followers.filter((id) => id !== String(idFollow) );
        userFollow.following = userFollow.following.filter((id) => id !== String(id));
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    // const updatedFollowUser = await User.findByIdAndUpdate(idFollow, userFollow, { new: true })

    res.json(updatedUser);
}