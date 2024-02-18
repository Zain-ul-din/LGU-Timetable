import React, { useState, useEffect, useCallback, useMemo } from 'react';

export const usePagination = <T>(
   data: Array<T>,
   itemsPerPage: number,
   initialActiveIndex = 1
): [T[], number[], number, React.Dispatch<React.SetStateAction<number>>] => {
   const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

   const getPageData = useCallback(() => {
      const startIndex = (activeIndex - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
   }, [activeIndex, data, itemsPerPage]);

   const getTotalPages = useCallback(
      () => Math.ceil(data.length / itemsPerPage), 
      [itemsPerPage, data]
   );

   useEffect(() => {
      // Reset active index if it exceeds the total number of pages
      const totalPages = getTotalPages();
      if (activeIndex > totalPages) { setActiveIndex(1); }
   }, [activeIndex, data, getTotalPages]);

   const paginationIndices = useMemo(()=> 
      Array.from(
         { length: getTotalPages() }, (_, index) => index + 1
      )
   , [getTotalPages]) 

   return [getPageData(), paginationIndices, activeIndex, setActiveIndex];
};

export default usePagination;