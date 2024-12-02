'use client'
import { useState } from 'react';
import { Button, Card, Flex, Notification, PasswordInput,  TextInput } from '@mantine/core';
import { isNotEmpty,  useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';



export default  function Loginpage(){
  const [status , setStatus] = useState('');
  const [visible, setVisible] = useState(false);
	const showNotification = () => setVisible(true);
	const hideNotification = () => setVisible(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: { Username: '',Passwd: '' },
    validate: {
      Username: isNotEmpty('Enter Username'),
      Passwd: isNotEmpty('Enter Your Password'),
    },
  });

  const router = useRouter();
  const handleNav : Function = ()=>{router.push(`/Main`)}

  const handleSubmit = async () => {
    
    fetch('/api/py/check-user',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(form.values)
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
      if(data.Msg==='valid'){	
        setStatus(data.Msg)
       
        handleNav();
      }
      else{
        showNotification() 
        setStatus(data.Msg)
      }
    })
  }


  return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={form.onSubmit((data)=>{handleSubmit(  )})}>
          <TextInput
            {...form.getInputProps('Username')}
            key={form.key('Username')}
            size='md'
            placeholder="Username"
          />
          <PasswordInput
            {...form.getInputProps('Passwd')}
            key={form.key('Passwd')}
            mt="md"
            size='md'
            placeholder="Password"
          />
          <Flex>
          <Button size='compact-md' type="submit"  mt="md">
            Submit
          </Button>
          {status && visible&& <Notification  color="red" 
          onClose={hideNotification}>{status}</Notification>}
          </Flex>
        </form>
      </Card>
    
  );
}