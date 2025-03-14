import type { BaseEntity } from '@dtos';

export const handleUpdateId = <T extends BaseEntity>(
  data: T[],
  isCopy?: boolean,
): T[] => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => {
    if (item.id && typeof item.id === 'string') {
      if (isCopy || item.id.includes('add_')) {
        return { ...item, id: null };
      }
    }
    return item;
  });
};

// Hàm tạo random ID
const generateRandomId = () => {
  return `add_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
};

// Hàm xử lý save item
export const handleSaveItem = <T extends { id?: string }>(
  value: T,
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  initialValues: T | null,
  handleCloseForm: () => void,
) => {
  setItems((prevItems) => {
    if (!initialValues) {
      return [...prevItems, { ...value, id: generateRandomId() }];
    }

    if (initialValues?.id) {
      const exists = prevItems.some((item) => item.id === initialValues.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === initialValues.id ? { ...item, ...value } : item,
        );
      }
      return prevItems;
    }

    return prevItems;
  });

  handleCloseForm();
};
