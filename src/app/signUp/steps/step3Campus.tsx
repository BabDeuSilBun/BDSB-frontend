import { useSignUpStore } from '@/state/authStore';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import AutoCompleteComboBox from '@/components/common/autoCompleteComboBox';
import { getSchoolsList } from '@/services/signUpService';

const Step3Campus = () => {
  const { setCampus } = useSignUpStore();
  const [inputValue, setInputValue] = useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['schoolList', inputValue],
    queryFn: ({ pageParam = 0 }) =>
      getSchoolsList({ page: pageParam, schoolName: inputValue }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
    enabled: !!inputValue,
  });

  // Transform data into suggestions
  const suggestions =
    data?.pages.flatMap((page) =>
      page.content.map((school) => ({
        id: school.id,
        display: `${school.name} ${school.campus}`,
      })),
    ) || [];

  const handleSelectSchool = (id: number) => {
    if (setCampus) setCampus(id);
    setInputValue('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <AutoCompleteComboBox
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeholder="재학 중인 대학교와 캠퍼스 입력"
        onSelect={handleSelectSchool}
        suggestions={suggestions}
      />
    </div>
  );
};

export default Step3Campus;
