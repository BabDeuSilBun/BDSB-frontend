'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { useSignUpStore } from '@/state/authStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import AutoCompleteComboBox from '@/components/common/autoCompleteComboBox';
import { getMajorsList } from '@/services/signUpService';

const Step4Department = () => {
  const { departmentName, setDepartmentName, setDepartment } = useSignUpStore();
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);
  const suggestionsListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (departmentName) setInputValue(departmentName);
  }, [departmentName]);

  const debouncedInputValue = useMemo(
    () =>
      debounce((value) => {
        setDebouncedValue(value);
      }, 300),
    [],
  );

  useEffect(() => {
    debouncedInputValue(inputValue);
  }, [inputValue, debouncedInputValue]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['majorList', debouncedValue],
      queryFn: ({ pageParam = 0 }) =>
        getMajorsList({ page: pageParam, majorName: debouncedValue || '' }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
      },
      enabled: true,
    });

  useEffect(() => {
    if (isFetchingNextPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(handleIntersect, {
      root: suggestionsListRef.current,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const suggestions =
    data?.pages.flatMap((page) =>
      page.content.map((major) => ({
        id: major.id,
        display: major.name,
      })),
    ) || [];

  const handleSelectMajor = (id: number, name: string) => {
    if (setDepartment) setDepartment(id);
    if (setDepartmentName) setDepartmentName(name);
    setInputValue('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <AutoCompleteComboBox
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeholder="재학 중인 학과를 입력하세요"
        onSelect={handleSelectMajor}
        suggestions={suggestions}
        status={status}
        lastElementRef={lastElementRef}
        suggestionsListRef={suggestionsListRef}
      />
    </div>
  );
};

export default Step4Department;
