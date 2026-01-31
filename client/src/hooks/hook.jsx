import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useErrors=(errors=[])=>{
    useEffect(()=>{
        errors.forEach(({isError,error,fallback})=>{
            if(isError){
                if(fallback) fallback();
                else
                    toast.error(error?.response?.data?.message||"Something went wrong");
            }
        });
    },[errors])
}

const useMutationHokk=(mutation)=>{

    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState(null);

    const [mutate]=mutation();

    const mutateHandler=async(toastMessage,...args)=>{
        setIsLoading(true);
        const toastId=toast.loading(toastMessage||"Updating Data...");
        try{
            const res=await mutate(...args);
            if(res.data)
            {
                toast.success(res.data.message||"Updated Successfully",{id:toastId});
                setData(res.data);
            }
            else{
                toast.error(res?.error?.data?.message||"something went wrong",{id:toastId});
            }
        }
        catch(err){
            console.log(err);
            toast.error(err?.response?.data?.message||"Something went wrong",{id:toastId});
        }finally{
            setIsLoading(false);
        }
    }

    return [mutateHandler,isLoading,data];

}

const useSocketEvents=(socket,handlers)=>{
     useEffect(() => {

        Object.entries(handlers).forEach(([event,handler])=>{
        socket.on(event, handler);

        })
    
        return () => {
            Object.entries(handlers).forEach(([event,handler])=>{
        socket.off(event, handler);

        })
        }
      }, [socket,handlers]);
}

export {useErrors,useMutationHokk,useSocketEvents};