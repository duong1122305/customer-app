import "./LienHe.css";
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Xóa lỗi nếu người dùng nhập đúng thông tin
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validate = () => {
    const newErrors = {};

    // Kiểm tra họ và tên (ít nhất 2 từ)
    if (!formData.name.trim() || formData.name.trim().split(' ').length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 từ';
    }

    // Kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Kiểm tra số điện thoại (bắt đầu với 0 và có độ dài 10 chữ số)
    const phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số)';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Xử lý gửi form tại đây, ví dụ như gọi API
      console.log('Form submitted:', formData);
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className="contact-form-container">
      <h2>Liên Hệ Với Chúng Tôi</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={errors.phone ? 'error-input' : ''}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Tin nhắn:</label>
          <textarea
            id="message"
            name="message"
            rows={10}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="button-group">
        <button type="reset" onClick={handleReset}>Nhập lại</button>
          <button type="submit">Gửi</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
