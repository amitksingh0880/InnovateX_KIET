import PrivateRoute from '@/components/privateRoute';
import React from 'react';

const Notification = () => {
  return (
    <PrivateRoute>
      <span className="font-bold text-4xl dark:text-white">Notification</span>

      <div className="">
          <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?  
          </div>
          <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?  
          </div>
        </div>
    </PrivateRoute>
  );
};

export default Notification;
