import React from 'react';
import {
    BoxComponent,
    FormBox,
    FormField,
    RegisterButton,
} from './common'

function Register() {

    return(
        <BoxComponent>
            <FormBox >
                <h1>Marker application form</h1>
                <FormField>
                <label htmlFor='firstName' 
                className='formLabel'>
                    First name
                </label>
                <input 
                    id='firstName'
                    type='text'
                    name='firstName'
                    className='formInput'
                    placeholder='First name'
                />
                </FormField>
                <FormField>
                <label htmlFor='lastName'
                 className='formLabel'>
                    Last name
                </label>
                <input 
                    id='lastName'
                    type='text'
                    name='lastName'
                    className='formInput'
                    placeholder='Last name'
                />
                </FormField>
                <FormField>
                <label htmlFor='email'
                 className='formLabel'>
                    Email
                </label>
                <input 
                    id='email'
                    type='email'
                    name='email'
                    className='formInput'
                    placeholder=' bcd123@aucklanduni.ac.nz'
                />
                </FormField>
                <FormField>
                <label htmlFor='password'
                 className='formLabel'>
                    Password
                </label>
                <input 
                    id='password'
                    type='password'
                    name='password'
                    className='formInput'
                    placeholder='password'
                />
                </FormField>
                <FormField>
                <label htmlFor='password2'
                 className='formLabel'>
                    Confirm password
                </label>
                <input 
                    id='password2'
                    type='password2'
                    name='password2'
                    className='formInput'
                    placeholder='password'
                />
                </FormField>
                <FormField>
                <label htmlFor='studentCV'
                 className='formLabel'>
                    CV Upload: 
                </label>
                <input 
                    id='studentCV'
                    type='file'
                    className='formInput'
                />   
                </FormField>        
            </FormBox>
            <RegisterButton 
                type="submit">   
                Register
            </RegisterButton>
        </BoxComponent>
    )
} 

export default Register;