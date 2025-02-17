import type { CampaignDTO } from '@dtos';
import { useCampaignSearchMasterDataQuery } from '@hooks/queries/useCampaignQueries';
import { useEffect, useState } from 'react';

export const useCampaignsMasterData = (isSearchFollowCode: boolean = true) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [dataList, setDataList] = useState<CampaignDTO[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // search list master data campaign
  const { data: campaignMasterData, isLoading } =
    useCampaignSearchMasterDataQuery({
      page: { pageNum: page, pageSize: 10 },
      code: isSearchFollowCode ? searchTerm : undefined,
      name: !isSearchFollowCode ? searchTerm : undefined,
    });

  useEffect(() => {
    if (campaignMasterData) {
      setDataList((prev) =>
        page === 1
          ? campaignMasterData.data.content
          : [...prev, ...campaignMasterData.data.content],
      );
      if (dataList.length >= campaignMasterData.data.total) {
        setHasMore(false);
      }
    }
  }, [campaignMasterData, page, dataList.length]);

  return {
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    dataList,
    hasMore,
    isLoading,
  };
};
