import { NavigationItem } from '@components/admin/NavigationItem.js';
import { BoxIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';
import { _ } from '@evershop/evershop/lib/locale/translate/_';

export default function NewProductQuickLink({ productNew }) {
  return <NavigationItem Icon={BoxIcon} title={_('New Product')} url={productNew} />;
}

NewProductQuickLink.propTypes = {
  productNew: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'quickLinks',
  sortOrder: 20
};

export const query = `
  query Query {
    productNew: url(routeId:"productNew")
  }
`;
