//frontend/src/pages/Contact/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <header className="contact-header">
                <h1 className="contact-title">Liên hệ</h1>
            </header>

            <main className="contact-main">
                <div className="contact-content">
                    <div className="contact-info">
                        <h2>Liên hệ</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        <p><span className="contact-label">Địa chỉ:</span> Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</p>
                        <p>
                            <span className="contact-label">Email:</span> 
                            ajimazingsup@gmail.com
                            <br />
                             helpcenter@email.tld
                        </p>
                        <p>
                            <span className="contact-label">Điện thoại liên lạc:</span>
                            0911.111.111
                            <br />
                            0979.999.777
                        </p>
                    </div>
                    <div className="contact-map">
                        <img src="/images/map.png" alt="Map" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;