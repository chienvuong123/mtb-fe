import { EControlType, EStatus } from '@constants/masterData';
import type { AttributeDTO } from '@dtos';
import sampleScenario from '@assets/images/Scenario.png';
import { getRandomDate, getRandomUser } from './common';

const mockAttributes: AttributeDTO[] = [
  {
    id: '1',
    attributeName: 'Chào hỏi',
    controlType: EControlType.TEXT,
    content: `<p>Em chào anh/chị ABC ạ, em là Long gọi đến từ ngân hàng quân đội MBbank</p><p> <br></p><p>Ngân hàng TMCP Quân Đội (MB) tiếp tục tung ra hàng loạt các ưu đãi lớn trong năm 2024 dành riêng cho chủ thẻ tín dụng MB VISA</p><p>Từ nay đến hết 31/12/2024, bạn sẽ được tận hưởng vô vàn trải nghiệm hấp dẫn với mức giá vô cùng ưu đãi khi sử dụng các sản phẩm, dịch vụ liên kết với MB. Khám phá ngay các chương trình ưu đãi khi chi tiêu trên thẻ tín dụng MB VISA để không bỏ lỡ cơ hội tối ưu chi phí!</p><p>Chương trình ưu đãi của MB áp dụng cho chủ sở hữu của tất cả các dòng thẻ như:</p><ul> <li>Thẻ đa năng MB HI VISA Collection</li> <li>Thẻ tín dụng quốc tế MB VISA Modern Youth</li> <li>Thẻ tín dụng quốc tế MB Priority</li> <li>Thẻ tín dụng quốc tế MB VISA Infinite</li> <li>Thẻ tín dụng quốc tế MB VISA</li></ul>`,
    config: 'Text Input',
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
  },
  {
    id: '2',
    attributeName: 'Ưu đãi dành cho khách hàng mới kích hoạt thẻ MB VISA',
    controlType: EControlType.CHECKBOX,
    content:
      '<p>Thời hạn: 10/05/2024 - 31/07/2024 (gồm 3 giai đoạn)</p><p>Hoàn 10% (tối đa 500.000 VNĐ) đối với các giao dịch chi tiêu tích lũy hợp lệ có trị giá từ 300.000 VNĐ.</p><p>Giao dịch hợp lệ là hoạt động chi tiêu bằng thẻ tín dụng đã được cấp hạn mức, không bao gồm rút tiền từ ATM, vay siêu nhanh từ thẻ tín dụng, thanh toán lãi hoặc phí bằng thẻ,...</p><p>Nếu bạn mới kích hoạt thẻ hoặc đã kích hoạt lâu rồi nhưng chưa chi tiêu thì có thể sử dụng ưu đãi này.</p><p>&gt;&gt;&gt; Chi tiết xem&nbsp;tại đây.</p>',
    config: {
      options: [
        { text: 'Nhận voucher 30.000 VNĐ cho hóa đơn từ 1 triệu.', value: '1' },
        {
          text: 'Nhận voucher 100.000 VNĐ cho hóa đơn từ 3 triệu.',
          value: '2',
        },
        {
          text: 'Nhận voucher 200.000 VNĐ cho hóa đơn từ 5 triệu.',
          value: '3',
        },
      ],
    },
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
    haveNote: true,
  },
  {
    id: '3',
    attributeName: 'Ưu đãi khi mua sắm bằng thẻ MB VISA',
    controlType: EControlType.SWITCH,
    content:
      '<p>Thời hạn: Từ nay đến hết 31/12/2024</p><p>Ưu đãi khi mua sắm tại hệ thống siêu thị liên kết với MB như: AEON, Lotte, Mega Market, Winmart, Coopmart, E-Mart,...</p>',
    // config: ['Nhận', 'Từ chối'],
    config: {
      options: [
        { text: 'Nhận', value: '1' },
        { text: 'Từ chối', value: '0' },
      ],
    },
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
  },
  {
    id: '4',
    attributeName: 'Khách hàng lựa chọn',
    controlType: EControlType.SELECT,
    content:
      '<p>- Chuyển tiền tại quầy ( các điểm giao dịch tại MB)</p><p>- Chuyển tiền online qua APP MBBank</p><p>- Hệ thống SWIFT GPI giúp việc chuyển tiền nhanh chóng, tiện lợi</p><p>- Tra cứu giao dịch chuyển tiền mọi lúc mọi nơi qua APP Mbbank</p><p>(*) Liên hệ CN/PGD để biết thêm chi tiết</p>',
    config: {
      options: [
        { text: 'Nhận voucher 30.000 VNĐ cho hóa đơn từ 1 triệu.', value: '1' },
        {
          text: 'Nhận voucher 100.000 VNĐ cho hóa đơn từ 3 triệu.',
          value: '2',
        },
        {
          text: 'Nhận voucher 200.000 VNĐ cho hóa đơn từ 5 triệu.',
          value: '3',
        },
      ],
    },
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
  },
  {
    id: '5',
    attributeName: 'Khách hàng lựa chọn',
    controlType: EControlType.RADIO,
    content: 'Ưu đãi dành cho khách hàng mới kích hoạt thẻ MB VISA',
    config: {
      options: [
        { text: 'Nhận voucher 30.000 VNĐ cho hóa đơn từ 1 triệu.', value: '1' },
        {
          text: 'Nhận voucher 100.000 VNĐ cho hóa đơn từ 3 triệu.',
          value: '2',
        },
        {
          text: 'Nhận voucher 200.000 VNĐ cho hóa đơn từ 5 triệu.',
          value: '3',
        },
      ],
    },
    haveNote: true,
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
  },
  {
    id: '6',
    attributeName: 'Khách hàng lựa chọn',
    controlType: EControlType.DATETIME,
    content: 'Ưu đãi dành cho khách hàng mới kích hoạt thẻ MB VISA',
    config: '2024-01-01',
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
  },
  {
    id: '7',
    attributeName: 'Khách hàng lựa chọn',
    controlType: EControlType.NUMBER,
    content: 'Ưu đãi dành cho khách hàng mới kích hoạt thẻ MB VISA',
    config: 42,
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
    haveNote: true,
  },
  {
    id: '8',
    attributeName: 'Thông tin cho Khách hàng',
    controlType: EControlType.EDITOR,
    content:
      '<p>Ngoài ra, MB gửi tặng anh bộ ấn phẩm mã thanh toán VietQR để anh nhận tiền thanh toán từ khách hàng, Anh cho em xin địa chỉ để gửi mã thanh toán QR về địa chỉ của mình ạ.</p><p>Ghi nhận địa chỉ</p><p>Số nhà, tên phố</p><p>Phường, xã</p><p>Quận, huyện</p><p>Tỉnh, thành phố</p><p>(Nếu khách hàng từ chối cung cấp thông tin địa chỉ hoặc không có nhu cầu nhận mã QR, có thể bỏ qua)</p>',
    config: '',
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
  },
  {
    id: '9',
    attributeName: 'Khách hàng lựa chọn',
    controlType: EControlType.IMAGE,
    content:
      '<p>1, Đối tượng áp dụng: Áp dụng cho chủ thẻ MB JCB nhận được tin nhắn/thông báo/email mời tham gia chương trình</p><p>2, Thời gian triển khai ưu đãi chia làm 2 giai đoạn</p><p>Giai đoạn 1: Từ ngày 01 tháng 02 đến ngày 28 tháng 02 năm 2025</p><p>Giai đoạn 2: Từ ngày 01 tháng 03 đến ngày 31 tháng 03 năm 2025</p><p>Số lượng giải thưởng/ mỗi giai đoạn: 1,000 giải thưởng hoặc cho đến khi hết ngân sách tùy điều kiện nào đến trước.</p><p>3, Nội dung ưu đãi: Hoàn 100,000 VND cho chủ thẻ MB JCB hợp lệ khi chi tiêu tích lũy đạt 300.000 VND trong từng giai đoạn</p>',
    config: { title: 'Sample image', src: sampleScenario },
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
  },
  {
    id: '10',
    attributeName: 'Khách hàng lựa chọn',
    controlType: EControlType.LINK,
    content: 'Khách hàng nhấn LINK để liên hệ',
    config: 'https://example.com',
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    haveNote: true,
    status: '',
  },
  {
    id: '11',
    attributeName: 'Khách hàng lựa chọn',
    controlType: EControlType.BUTTON,
    content: 'Khách hàng nhấn BUTTON để liên hệ',
    config: {
      title: 'Liên hệ',
      link: 'https://example.com',
    },
    createdDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedDate: getRandomDate(),
    updatedBy: getRandomUser(),
    status: '',
    haveNote: true,
  },
];

export const MOCK_SCENARIOS = Array.from({ length: 20 }, (_, index) => ({
  id: `scenario-${index + 1}`,
  name: `Scenario ${index + 1}`,
  code: `SC-${index + 1}`,
  description: `Description for scenario ${index + 1}`,
  attributes: mockAttributes.map((attr) => ({
    ...attr,
    id: `${attr.id}-${index + 1}`,
    createdDate: getRandomDate(),
    updatedDate: getRandomDate(),
    createdBy: getRandomUser(),
    updatedBy: getRandomUser(),
  })),
  createdDate: getRandomDate(),
  createdBy: getRandomUser(),
  updatedDate: getRandomDate(),
  updatedBy: getRandomUser(),
  status: Math.random() > 0.5 ? EStatus.ACTIVE : EStatus.INACTIVE,
}));
