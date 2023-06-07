import { React } from "react";
import "./pageOne.css";

import Header from "../../components/layout/Header/header";

const PageOne = () => {
  const handleClick = (e) => {
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        for (let i = 0; i < items.length; i++) {
          if (items[i].classList.contains("default-chart")) {
            items[i].classList.remove("default-chart");
            itemdetails[i].classList.remove("active");
          }
        }
        items[i].classList.add("default-chart");
        itemdetails[i].classList.add("active");
      });
    }
  };

  const items = document.getElementsByClassName("default");
  const itemdetails = document.getElementsByClassName("default-img");

  return (
    <div className="main">
      <div className="skip-target">
        <section className="ui-section">
          <div className="container">
            <div className="container-content">
              <h3 className="text-content-header">
                Trello tập hợp tất cả các nhiệm vụ, thành viên nhóm và công cụ
                của bạn lại với nhau
              </h3>
              <p className="text-content">
                Duy trì mọi thứ ở cùng một nơi - dù cho nhóm của bạn không ở
                cùng nhau
              </p>
              <form action="" className="form-skip">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="input-skip-container"
                />
                <button className="button-skip" type="submit">
                  Đăng ký - hoàn toàn miễn phí
                </button>
              </form>
            </div>
            <div className="container-content">
              <div className="container-content-img">
                <img
                  src={require("../../assets/img/TrelloUICollage_4x.webp")}
                  alt="ảnh minh họa"
                  className="img-content"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="skip-target-one">
        <div className="ui-section">
          <div className="main-content">
            <h6 className="main-content-header">THÔNG TIN CƠ BẢN VỀ TRELLO</h6>
            <h2>Đỉnh cao về năng suất</h2>
            <p>
              Đơn giản, linh hoạt và mạnh mẽ. Chỉ với bảng, danh sách và thẻ,
              bạn sẽ biết rõ ai đang làm gì và những việc cần làm.
            </p>
          </div>
        </div>
      </div>

      <div className="skip-target-two">
        <section className="ui-section">
          <div className="content-info">
            <div className="content-default">
              <button className="default default-chart" onClick={handleClick}>
                <h6>Các bảng</h6>
                <p>
                  Bảng Trello giúp bạn sắp xếp hợp lý các nhiệm vụ và thúc đẩy
                  công việc. Bạn có thể xem mọi thông tin, từ việc cần làm đến
                  việc đã hoàn thành, chỉ trong nháy mắt.
                </p>
              </button>

              <button className="default" onClick={handleClick}>
                <h6>DANH SÁCH</h6>
                <p>
                  Các giai đoạn khác nhau của một nhiệm vụ. Hãy bắt đầu thật đơn
                  giản với Việc cần làm, Việc đang làm hoặc Việc đã xong—hoặc
                  xây dựng một quy trình làm việc tùy chỉnh theo đúng nhu cầu
                  của nhóm bạn. Với Trello, cách nào cũng phát huy hiệu quả.
                </p>
              </button>

              <button className="default" onClick={handleClick}>
                <h6>THẺ</h6>
                <p>
                  Thẻ trình bày các nhiệm vụ và ý tưởng, đồng thời lưu giữ mọi
                  thông tin giúp hoàn thành công việc. Trong quá trình thực hiện
                  nhiệm vụ, bạn có thể di chuyển thẻ qua các danh sách để thể
                  hiện trạng thái của thẻ.
                </p>
              </button>
            </div>

            <div className="content-default-img">
              <div className="default-img active">
                <img
                  src={require("../../assets/img/Carousel_Image_Boards_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>

              <div className="default-img">
                <img
                  src={require("../../assets/img/Carousel_Image_Lists_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>

              <div className="default-img ">
                <img
                  src={require("../../assets/img/Carousel_Image_Cards_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="skip-target-three">
        <div className="ui-section">
          <div className="content-start">
            <h3>Bắt đầu sử dụng Trello ngay hôm nay</h3>
            <form action="" className="form-skip">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="input-skip-container"
              />
              <button className="button-skip" type="submit">
                Đăng ký - hoàn toàn miễn phí
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="skip-target-end">
        <div className="ui-section">
          <div className="footer-skip">
            <div className="logo">
              <img src={require("../../assets/img/logo.png")} alt="" />
            </div>
            <div className="text-content">
              <h4>Tìm hiểu về Trello</h4>
              <p>Công nghệ nền tảng.</p>
            </div>
            <div className="text-content">
              <h4>Việc làm</h4>
              <p>
                Tìm hiểu về các vai trò chưa ai đảm nhiệm trong nhóm Trello.
              </p>
            </div>
            <div className="text-content">
              <h4>Ứng dụng</h4>
              <p>
                Tải xuống Ứng dụng Trello cho Máy tính hoặc Thiết bị di động.
              </p>
            </div>
            <div className="text-content">
              <h4>Liên hệ với chúng tôi</h4>
              <p>Bạn cần giúp đỡ? Hãy liên lạc để chúng tôi có thể hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOne;
