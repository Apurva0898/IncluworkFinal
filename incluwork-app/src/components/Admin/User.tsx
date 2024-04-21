import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { UserType } from '../../models/User';

// Define the User interface based on the data shape returned from the backend
interface User {
    id: string;
    name: string;
    email: string;
    type: UserType;
    contactNumber?: string; // Optional
}

// Define the UserItem component to display individual user details
const UserItem: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Paper style={{ padding: '16px', marginBottom: '8px' }}>
            <Typography variant="h6">User ID: {user.id}</Typography>
            <Typography>Name: {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Type: {user.type}</Typography>
            {user.contactNumber && <Typography>Contact Number: {user.contactNumber}</Typography>}
        </Paper>
    );
};

// Define the main Users component
const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    // Fetch user data from the backend and set the state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/incluwork/admin/users', {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFjZWM0MTU4ZmM5YmM2M2ViZGM5N2QiLCJpYXQiOjE3MTMxNzI4NTF9.o_CE-nlXYltG_8YdrADVVE-MJkEl9BCGFF6urjbuB2g',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: User[] = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container justifyContent="center" style={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Typography variant="h4" style={{ marginBottom: '20px' }}>
                    Users
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                {users.length > 0 ? (
                    users.map((user) => (
                        <UserItem key={user.id} user={user} />
                    ))
                ) : (
                    <Typography variant="h6" style={{ textAlign: 'center' }}>
                        No users found
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default Users;



