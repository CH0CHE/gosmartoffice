import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/common/ui/Card.js';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import './Lifetimesales.scss';
import { _ } from '@evershop/evershop/lib/locale/translate/_';

const COLORS = ['#aee9d1', '#fed3d1', '#a4e8f2'];

const Dot = ({ variant }) => {
  let bgColor = 'bg-gray-400';
  if (variant === 'info') {
    bgColor = 'bg-blue-400';
  } else if (variant === 'success') {
    bgColor = 'bg-green-400';
  } else if (variant === 'critical') {
    bgColor = 'bg-red-400';
  }
  return <span className={`w-3 h-3 rounded-full ${bgColor} inline-block`} />;
};

Dot.propTypes = {
  variant: PropTypes.oneOf(['info', 'success', 'critical'])
};

export default function LifetimeSale({ api }) {
  const [data, setData] = React.useState({});
  const [fetching, setFetching] = React.useState(true);
  const { orders, total, completed_percentage, cancelled_percentage } = data;

  const chartData = [
    { name: 'Completed', value: completed_percentage },
    { name: 'Cancelled', value: cancelled_percentage },
    {
      name: 'Others',
      value: 100 - completed_percentage - cancelled_percentage
    }
  ];

  React.useEffect(() => {
    if (window !== undefined) {
      fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setFetching(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, []);

  if (fetching) {
    return (
      <Card title={_("Lifetime Sales")}>
        <CardHeader>
          <CardTitle>{_("Lifetime Sales")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="skeleton-wrapper-lifetime">
            <div className="skeleton" />
            <div className="skeleton" />
            <div className="skeleton" />
            <div className="skeleton" />
          </div>
        </CardContent>
        <CardContent>
          <div className="skeleton-wrapper-lifetime">
            <div className="skeleton-chart" />
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card title={_("Lifetime Sales")}>
        <CardHeader>
          <CardTitle>{_("Lifetime Sales")}</CardTitle>
          <CardDescription>
            {_("Overview of total sales and order status over the lifetime of your")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex space-x-2 items-center">
              <Dot variant="info" />
              <div className="self-center">{_("${orders} orders", {orders: String(orders)})}</div>
            </div>
            <div className="flex space-x-2 items-center">
              <Dot variant="info" />
              <div className="self-center">{_("${total} lifetime sale", {total: String(total)})}</div>
            </div>
            <div className="flex space-x-2 items-center">
              <Dot variant="success" />
              <div className="self-center">
                {_("${completed_percentage}% of orders completed", {completed_percentage: String(completed_percentage)})}
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <Dot variant="critical" />
              <div className="self-center">
                {_("${cancelled_percentage}% of orders cancelled", {cancelled_percentage: String(cancelled_percentage)})}
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  labelLine={false}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }
}

LifetimeSale.propTypes = {
  api: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'rightSide',
  sortOrder: 10
};

export const query = `
  query Query {
    api: url(routeId: "lifetimesales")    
  }
`;
