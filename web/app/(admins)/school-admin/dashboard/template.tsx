import RightSide from '@/components/schoolAdmin/dashboard/RightSide';
import React from 'react';

const template = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="w-full flex ">
         <RightSide />
         <div className="w-full mx-5">{children}</div>
      </div>
   );
};

export default template;
