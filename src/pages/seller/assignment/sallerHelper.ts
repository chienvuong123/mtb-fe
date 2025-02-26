import type { SellerDistribution } from '@dtos';
import type { FormInstance } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import type { TSellerRecord } from './components';

export function distributeCustomers(
  customerCount: number,
  sellers: TSellerRecord[],
  form: FormInstance,
): SellerDistribution[] {
  let customerHasBeenTakenCount = 0;
  const activeSellers = sellers.filter((seller) => {
    if (seller.isLock) {
      const count = form.getFieldValue(`quantity_${seller?.sellerId}`);
      if (!Number.isNaN(count)) {
        customerHasBeenTakenCount += form.getFieldValue(
          `quantity_${seller?.sellerId}`,
        );
      }
    }
    return !seller.isLock;
  }); // Filter out sellers with isLock = true
  const numSellers = activeSellers.length;

  if (customerCount === 0 || numSellers === 0) return []; // Prevent division by zero

  const totalCustomer = customerCount - customerHasBeenTakenCount;

  const baseCount = Math.floor(totalCustomer / numSellers); // Base number of customers each seller gets
  const extraCount = totalCustomer % numSellers; // Remaining customers to be distributed

  return activeSellers.map(({ sellerId, isLock }, index) => ({
    isLock,
    sellerId,
    customerQuantity: baseCount + (index < extraCount ? 1 : 0), // Distribute extra customers to the first few sellers
  }));
}

export function getDataSplitSeller(
  values: AnyObject,
  records: TSellerRecord[],
) {
  return records.map((c) => {
    return {
      customerQuantity: values[`quantity_${c.sellerId}`],
      isLock: values[`isLock_${c.sellerId}`],
      sellerId: c.sellerId as string,
    };
  });
}

export function getMaxQuantity(
  totalCustomer: number,
  currentSellerId: string,
  form: FormInstance,
) {
  return (
    totalCustomer -
    Object.entries(form.getFieldsValue()).reduce((a, [key, value]) => {
      if (
        key.includes('quantity_') &&
        key !== `quantity_${currentSellerId}` &&
        typeof value === 'number' &&
        value > 0
      ) {
        return a + value;
      }
      return a;
    }, 0)
  );
}
