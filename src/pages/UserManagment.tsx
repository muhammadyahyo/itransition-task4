
import { useState } from 'react';
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import { User } from '../types/types';

const UserManagementPage = () => {
    const [users, setUsers] = useState<User[]>();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const navigate = useNavigate()
    console.log(selectedUsers);

    const { refetch } = useQuery([], () => {
        if (localStorage.getItem('key') === null) {
            navigate('/signup')
        } else {
            navigate('/user-management')
        }

        fetch(`http://localhost:8000/users/users`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('key')}`
            }
        }).then(res => res.json()).then(res => {
            setUsers(res)
        })
        
    })

    const handleBlock = async () => {
        try {
            const selectedUserIds = selectedUsers;

            const updatePromises = selectedUserIds.map(userId => {
                const userToUpdate = users?.find(user => user._id === userId);
                fetch(`http://localhost:8000/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('key')}`
                    },
                    body: JSON.stringify({
                        ...userToUpdate,
                        isBlocked: true 
                    })
                }).then((res) => res.json()).then((res) => {
                    console.log(res)
                    

                    refetch()
                });
            });

            await Promise.all(updatePromises);

            console.log('Users successfully updated');
        } catch (error) {
            console.error('Error updating users:', error);
        }
    };


    const handleCheckboxChange = (userId: string) => {
        const isSelected = selectedUsers.includes(userId);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleAllCheckboxChange = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            if (users !== undefined) {
                setSelectedUsers(users.map(user => user._id));
            }
            // setSelectedUsers(users.map(user => user._id));
        }
        setSelectAll(!selectAll);
    };



    const handleUnblock = async () => {
        try {
            const selectedUserIds = selectedUsers;

            const updatePromises = selectedUserIds.map(userId => {
                const userToUpdate = users?.find(user => user._id === userId);
                fetch(`http://localhost:8000/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('key')}`
                    },
                    body: JSON.stringify({
                        ...userToUpdate,
                        isBlocked: false 
                    })
                }).then((res) => res.json()).then((res) => {
                    console.log(res)
                    refetch()
                });
            });

            await Promise.all(updatePromises);

            console.log('Users successfully updated');
        } catch (error) {
            console.error('Error updating users:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const selectedUserIds = selectedUsers;
            const updatePromises = selectedUserIds.map(userId => {
               
                fetch(`http://localhost:8000/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('key')}`
                    },

                }).then((res) => res.json()).then((res) => {
                    console.log(res)
                    refetch()
                });
            });

            await Promise.all(updatePromises);

            console.log('Users successfully deleted');
        } catch (error) {
            console.error('Error delete users:', error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="overflow-x-auto">
                <div className='my-5'>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4 disabled:opacity-50"
                onClick={handleBlock}
                disabled={selectedUsers.every(userId => users?.find(user => user._id === userId)?.isBlocked)}
                >Block</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4 disabled:opacity-50" onClick={handleUnblock}
                disabled={selectedUsers.every(userId => !users?.find(user => user._id === userId)?.isBlocked)}
                >Unblock</button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50" onClick={handleDelete}>Delete</button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleAllCheckboxChange}
                                />
                            </th>
                            {/* <th className="border border-gray-300 p-2">ID</th> */}
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Last Login</th>
                            <th className="border border-gray-300 p-2">Registration Time</th>
                            <th className="border border-gray-300 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user._id} className=""  >
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user._id)}
                                        onChange={() => handleCheckboxChange(user._id)}
                                    />
                                </td>
                                {/* <td className="border border-gray-300 p-2">{user._id}</td> */}
                                <td className="border border-gray-300 p-2">{user.username}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">{user.lastLoginDate}</td>
                                <td className="border border-gray-300 p-2">{user.registrationDate}</td>
                                <td className="border border-gray-300 p-2">{user.isBlocked? 'Blocked': 'Active'}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default UserManagementPage;
