import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const secret = 'test';


export const signin =  async (req ,res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: 'Este usuario no existe.' });
        
        const isPasswordCorrect = await bcrypt.compare(password, existinUser.password);
    
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