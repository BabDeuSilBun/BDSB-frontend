'use client';

import { useState } from 'react';
import SettingImage from '@/components/meetings/settingImage';
import SettingLabel from '@/components/meetings/settingLabel';
import SettingAddress from '@/components/meetings/settingAddress';
import TimeInput from '@/components/common/timeInput';
import { CustomDropdown } from '@/components/common/dropdown';
import InfoBox from '@/components/common/infoBox';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 var(--spacing-md) 6rem;
`;

const Step1 = () => {

  // 식사 방식
  const options1 = [
    { id: 1, name: '함께 식사', value: 'option1' },
    { id: 2, name: '각자 식사', value: 'option2' },
  ];

  // 주문 방식
  const options2 = [
    { id: 1, name: '바로 주문', value: 'optionA' },
    { id: 2, name: '예약 주문', value: 'optionB' },
  ];

  // State management for the first dropdown
  const [selectedValue1, setSelectedValue1] = useState<string | null>(options1[0]?.value || null);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);

  // State management for the second dropdown
  const [selectedValue2, setSelectedValue2] = useState<string | null>(options2[0]?.value || null);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  // Handlers for the first dropdown
  const handleSelect1 = (value: string | null) => {
    setSelectedValue1(value);
  };
  const handleToggleDropdown1 = () => {
    setIsDropdownOpen1((prev) => !prev);
  };

  // Handlers for the second dropdown
  const handleSelect2 = (value: string | null) => {
    setSelectedValue2(value);
  };
  const handleToggleDropdown2 = () => {
    setIsDropdownOpen2((prev) => !prev);
  };

  return (
    <Container>
      <SettingImage />
      <SettingLabel text="팀 주문 방식" />
      <CustomDropdown
        options={options1}
        selectedValue={selectedValue1}
        onSelect={handleSelect1}
        isOpen={isDropdownOpen1}
        onToggle={handleToggleDropdown1}
      />
      <InfoBox
        textItems={[
          { text: "함께 식사:", $textStyle: "Title", sameRow: true },
          { text: "다 같이 한 장소에서 수령하여 함께 식사해요.", $textStyle: "Description" },
          { text: "각자 식사:", $textStyle: "Title", sameRow: true },
          { text: "각자 설정한 주소로 수령하여 편하게 식사해요.", $textStyle: "Description" },
        ]}
        showIcon={false}
      />
      <CustomDropdown
        options={options2}
        selectedValue={selectedValue2}
        onSelect={handleSelect2}
        isOpen={isDropdownOpen2}
        onToggle={handleToggleDropdown2}
      />
      <InfoBox
        textItems={[
          { text: "바로 주문:", $textStyle: "Title", sameRow: true },
          { text: "최대 모집 인원이 모일 시 바로 주문합니다.", $textStyle: "Description" },
          { text: "예약 주문:", $textStyle: "Title", sameRow: true },
          { text: "주문 대기 시간에 맞춰 주문합니다.", $textStyle: "Description" },
        ]}
        showIcon={false}
      />
      <SettingLabel text="수령 장소" />
      <SettingAddress />
      <SettingLabel text="모임 장소" />
      <input
          type="text"
          placeholder="모임 장소"
        />
      <SettingLabel text="주문 대기 최대 기한" />
      <TimeInput />
    </Container>
  );
};

export default Step1;