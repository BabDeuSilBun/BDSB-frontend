interface TeamOrderItemProps {
  item: {
    meetingId: number;
    storeId: number;
    // 다른 필드들도 여기에 추가
    storeName: string;
    status: string;
  };
}

const TeamOrderItem = ({ item }: TeamOrderItemProps) => {
  return (
    <div>
      <h3>{item.storeName}</h3>
      <p>Status: {item.status}</p>
      {/* 다른 항목들을 여기에 추가 */}
    </div>
  );
};

export default TeamOrderItem;
