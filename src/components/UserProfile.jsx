import backgroundImage from '../assets/bg.jpg';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(() => {
        // Initialize bio from local storage if available
        const savedBio = localStorage.getItem('userBio');
        return savedBio ? savedBio : "This is a sample biography.";
    });
    const [tempBio, setTempBio] = useState(bio);

    const handleEdit = () => {
        setTempBio(bio);
        setIsEditing(true);
    };

    const handleSave = () => {
        setBio(tempBio);
        localStorage.setItem('userBio', tempBio); // Save updated bio to local storage
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempBio(bio);
        setIsEditing(false);
    };

    return (
        <div className='flex flex-col w-full' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className="user-profile" style={styles.container}>
                <Link to="/" style={styles.closeButton}>X</Link> {/* X button for home navigation */}
                <div style={styles.profileInfo}>
                    <div style={styles.imageContainer}>
                        <img
                            src="https://placehold.co/100x100/png"
                            alt="User"
                            style={styles.image}
                        />
                    </div>
                    <div style={styles.textContainer}>
                        <h2 style={{ ...styles.name, color: 'black' }}>John Doe</h2>
                        <p style={{ ...styles.contact, color: 'black' }}>Contact: johndoe@example.com</p>
                    </div>
                </div>
                <div style={styles.bioContainer}>
                    <h3 style={{ color: 'black' }}>Biography/Description:</h3>
                    {isEditing ? (
                        <div>
                            <textarea
                                value={tempBio}
                                onChange={(e) => setTempBio(e.target.value)}
                                style={styles.textarea}
                            />
                            <div style={styles.buttonContainer}>
                                <button onClick={handleSave} style={styles.button}>Save</button>
                                <button onClick={handleCancel} style={styles.button}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p style={{ ...styles.bio, color: 'black' }}>{bio}</p>
                            <button onClick={handleEdit} style={styles.button}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '70%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'left',
        backgroundColor: 'white',
        margin: '20px auto',
        position: 'relative',
        boxShadow: 'none',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '8px 12px',
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '10px',
    },
    profileInfo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
    },
    imageContainer: {
        marginRight: '16px',
    },
    image: {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    name: {
        margin: '4px 0',
        fontSize: '30px',
    },
    contact: {
        margin: '4px 0',
    },
    bioContainer: {
        marginTop: '16px',
    },
    bio: {
        margin: '8px 0',
    },
    textarea: {
        width: '100%',
        height: '60px',
        padding: '8px',
        margin: '8px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    buttonContainer: {
        marginTop: '8px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    },
};

export default UserProfile;
