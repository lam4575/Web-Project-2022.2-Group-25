import { React } from "react";
import "./pageOne.css";

const PageOne = () => {
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
                  src={require("../assets/img/TrelloUICollage_4x.webp")}
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
              <button className="default default-chart">
                <h6>Các bảng</h6>
                <p>
                  Bảng Trello giúp bạn sắp xếp hợp lý các nhiệm vụ và thúc đẩy
                  công việc. Bạn có thể xem mọi thông tin, từ việc cần làm đến
                  việc đã hoàn thành, chỉ trong nháy mắt.
                </p>
              </button>

              <button className="default">
                <h6>DANH SÁCH</h6>
                <p>
                  Các giai đoạn khác nhau của một nhiệm vụ. Hãy bắt đầu thật đơn
                  giản với Việc cần làm, Việc đang làm hoặc Việc đã xong—hoặc
                  xây dựng một quy trình làm việc tùy chỉnh theo đúng nhu cầu
                  của nhóm bạn. Với Trello, cách nào cũng phát huy hiệu quả.
                </p>
              </button>

              <button className="default">
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
              <div className="default-img">
                <img
                  src={require("../assets/img/Carousel_Image_Boards_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>

              <div className="default-img active">
                <img
                  src={require("../assets/img/Carousel_Image_Lists_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>

              <div className="default-img ">
                <img
                  src={require("../assets/img/Carousel_Image_Cards_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="skip-target">
        <div className="ui-section"></div>
      </div>
      <div className="skip-target">
        <div className="ui-section"></div>
      </div>
    </div>
  );
};

export default PageOne;
