import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import RegisterPopup from '../../components/RegisterPopup/RegisterPopup';
import ForgotPasswordPopup from '../../components/ForgotPasswordPopup/ForgotPasswordPopup';
import RedButton from '../../components/RedButton/RedButton';
import Service from '../../components/Service/Service';
import { PiChefHatLight } from "react-icons/pi";
import { ImSpoonKnife } from "react-icons/im";
import { LuCalendarDays } from "react-icons/lu";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import './HomePage.css';
import { Route } from 'react-router-dom';

const HomePage = () => {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/images/slider1.png',
        '/images/slider2.png',
        '/images/slider3.png',
        '/images/slider4.png',
        '/images/slider5.png'
    ];

    useEffect(() => {
        if (images.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [images.length]);

    const handleOpenLoginPopup = () => {
        setIsLoginPopupOpen(true);
        setShowForgotPassword(false);
    };

    const handleCloseLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    const handleOpenRegisterPopup = () => {
        setIsRegisterPopupOpen(true);
    };

    const handleCloseRegisterPopup = () => {
        setIsRegisterPopupOpen(false);
    };

    const handleOpenForgotPassword = () => {
        setShowForgotPassword(true);
        setIsLoginPopupOpen(false);
    };

    const handleCloseForgotPassword = () => {
        setShowForgotPassword(false);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    const navigate = useNavigate();

    const handleViewMenu = () => {
        navigate('/menu');
    };

    const handleReserve = () => {
      navigate('/reservation');
  };

    return (
        <div className="homepage-container">
            <div className="slider-container">
                <div
                    className="slider"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div className="slide" key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="slider-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></button>
                    ))}
                </div>
            </div>

            <section className="about-section">
                <h1 className="section-title">GIỚI THIỆU VỀ AJIMAZING</h1>
                <div className='about-content'>
                  <div className='about-description'>
                    <h2>AJIMAZING</h2>
                    <h3>Nơi ẩm thực truyền thống hòa quyện với phong cách hiện đại.</h3>
                    <p>
                    Tại Ajimazing, chúng tôi không chỉ đơn thuần phục vụ các món ăn, mà còn kể câu chuyện về văn hóa và truyền thống Nhật Bản qua từng chi tiết, từ nguyên liệu tươi ngon, cách bài trí món ăn cho đến không gian ấm cúng, đậm chất Nhật.

Với đội ngũ đầu bếp dày dạn kinh nghiệm và niềm đam mê sáng tạo, Ajimazing cam kết mang đến cho thực khách những bữa ăn ngon miệng, chuẩn vị, và trọn vẹn cảm xúc.

Hãy đến với Ajimazing để khám phá sự tuyệt vời của ẩm thực Nhật Bản, nơi mỗi món ăn đều là một hành trình trải nghiệm vị giác đầy hấp dẫn!
                    </p>
                    <div className='menu-button'>
                      <RedButton label="Xem thực đơn" onClick={handleViewMenu} />
                    </div>
                  </div>
                  <div className="about-images">
                      <div className="window-box">
                        <img src="/images/about-img1.png" alt="Dish 1" />
                      </div>
                      <div className="window-box">
                        <img src="/images/about-img2.png" alt="Dish 2" />
                      </div>
                      <div className="window-box">
                        <img src="/images/about-img3.png" alt="Dish 3" />
                      </div>
                      <div className="window-box">
                        <img src="/images/about-img4.png" alt="Dish 4" />
                      </div>
                  </div>
                </div>
            </section>

            <section className="services-section">
                <h1 className="section-title">DỊCH VỤ CỦA NHÀ HÀNG</h1>
                <div className="services">
                    <Service 
                    href="/" 
                    label="Đầu bếp"
                    icon={<PiChefHatLight />}
                    detail="Đội ngũ đầu bếp giàu kinh nghiệm, mang đến những món ăn chuẩn bị Nhật Bản truyền thống, kết hợp hiện đại"
                    />
                    <Service 
                    href="/menu" 
                    label="Thực phẩm" 
                    icon={<ImSpoonKnife />}
                    detail="Nguyên liệu tươi ngon, được tuyển chọn kỹ lưỡng từ các nguồn cung ứng uy tín để đảm bảo chất lượng cao nhất"
                    />
                    <Service 
                    href="/reservation" 
                    label="Đặt bàn online" 
                    icon={<LuCalendarDays />}
                    detail="Dễ dàng đặt món, đặt bàn chỉ với vài thao tác, mang đến trải nghiệm tiện lợi và nhanh chóng cho khách hàng"
                    />
                    <Service 
                    href="/contact" 
                    label="Dịch vụ 24/7" 
                    icon={<TfiHeadphoneAlt />}
                    detail="Dịch vụ hỗ trợ khách hàng liên tục, luôn sẵn sàng giải đáp và phục vụ bất cứ lúc nào"
                    />
                </div>
            </section>

            <section className="chefs-section">
              <h1 className="section-title">ĐẦU BẾP CỦA CHÚNG TÔI</h1>
              <div className="chefs">
                  <img src="/images/chef.png" alt="Chef 1" />
                  <img src="/images/chef.png" alt="Chef 2" />
                  <img src="/images/chef.png" alt="Chef 3" />
              </div>
              <div className='reserve-button'>
                <RedButton label="Đặt bàn ngay" onClick={handleReserve} />
              </div>
            </section>

            <section className="contact-section">
              <h1 className="section-title">Liên hệ</h1>
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
            </section>

            <LoginPopup 
                isOpen={isLoginPopupOpen} 
                onClose={handleCloseLoginPopup} 
                onForgotPassword={handleOpenForgotPassword}
            />
            <RegisterPopup
                isOpen={isRegisterPopupOpen}
                onClose={handleCloseRegisterPopup}
            />
            <ForgotPasswordPopup 
                isOpen={showForgotPassword} 
                onClose={handleCloseForgotPassword} 
            />
        </div>
    );
};

export default HomePage;
