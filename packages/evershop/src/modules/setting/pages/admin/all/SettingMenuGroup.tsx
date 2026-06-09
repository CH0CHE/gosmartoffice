import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { Settings } from 'lucide-react';
import React from 'react';
import { _ } from '@evershop/evershop/lib/locale/translate/_';

interface CmsMenuGroupProps {
  storeSetting: string;
}

export default function CmsMenuGroup({ storeSetting }: CmsMenuGroupProps) {
  return (
    <NavigationItemGroup
      id="settingMenuGroup"
      name={_("Setting")}
      Icon={() => <Settings width={15} height={15} />}
      url={storeSetting}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 500
};

export const query = `
  query Query {
    storeSetting: url(routeId:"storeSetting")
  }
`;
