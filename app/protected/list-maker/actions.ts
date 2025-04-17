'use server';

// import { encodedRedirect } from '@/utils/utils';
// import { createClient } from '@/utils/supabase/server';
// import { headers } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { User } from '@/app/protected/types';

export const saveListToDatabase = async (blob: Blob, name: string) => {
  try {
    const formData = new FormData();
    formData.append('file', blob, 'selected-products.json');
    formData.append('name', name);

    const response = await fetch('/api/save-list', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to save the list');
    }

    return 'List saved successfully!';
  } catch (error) {
    console.error(error);
    throw new Error('Error saving the list.');
  }
};
