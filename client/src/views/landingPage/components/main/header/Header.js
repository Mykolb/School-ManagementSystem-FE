import React from 'react';
import './header.scss';

function Header() {
    return (
        <section className="hero">
            <div className="wrap">
                <h1>An English Language School</h1>
                <div className="content-box">
                    <h2>for Children in Bahrain</h2>
                    <div className="flex">
                        <button>Register Now</button>
                        <button>Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header;