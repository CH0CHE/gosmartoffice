import { PageHeading } from '@components/admin/PageHeading.js';
import React from 'react';
import { _ } from '@evershop/evershop/lib/locale/translate/_';

export interface AttributGridPageHeadingProps {
  backUrl?: string;
}
export default function AttributGridPageHeading() {
  return <PageHeading heading={_('Attributes')} />;
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
