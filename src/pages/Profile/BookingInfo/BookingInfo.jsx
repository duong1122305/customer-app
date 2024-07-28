import { Tab, Tabs } from "react-bootstrap";
import "./BookingInfo.css";
import BookingInfoChild from "./BookingInfoChild/BookingInfoChild";

const BookingInfo = () => {
  return (
    <div className="tab_content">
      <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="home" title="Tất cả">
          <BookingInfoChild />
        </Tab>
        <Tab eventKey="profile" title="Chuẩn bị">
          Tab content for Profile
        </Tab>
        <Tab eventKey="longer-tab" title="Đã xong">
          Tab content for Loooonger Tab
        </Tab>
      </Tabs>
    </div>
  );
};

export default BookingInfo;
