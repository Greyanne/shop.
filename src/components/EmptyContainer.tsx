import { IonButton } from '@ionic/react';
import React from 'react'

const EmptyContainer = () => {
  return (
    <div className="flex flex-col gap-4 items-center text-center mt-24">
      <h1 className="m-auto text-xl ">No products found</h1>
      <IonButton href='/' size='small' className='rounded-lg'>Go back home</IonButton>
    </div>
  );
}

export default EmptyContainer