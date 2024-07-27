import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { getAllUserPost} from '../../lib/api';
import { User } from '../../componant/User';

const AllUsers = () => {

  const [searchValue, setSearchValue] = useState('')
  const [pepole, setPepole] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  
  const getPepole = async () => {
    setIsLoading(true)
    const data:any = await getAllUserPost()
    setPepole(data)
    setIsLoading(false)
  }
  
  useEffect(() => {
    getPepole()
  }, [])

  const getFilterPosts = (pepoles:any, value:string) => {
    return pepoles.filter((e:any) => {
      return (e.name.toLowerCase().includes(value.toLowerCase()))
    });
  };


  const filterPepole = getFilterPosts(pepole,searchValue)

  
  return (
    <div className='user-container'>
        <h2 className=' w-full h3-bold md:h2-bold ' >Search Pepole</h2>
        <div className='bg-dark-4 w-full rounded-lg flex gap 1 ' >

          <SearchIcon fontSize='large' className='mr-3' />
          <input
            placeholder='serch user'
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            name='pepole'
            type='text'
            className='explore-search w-full'
          />
        </div>
        <div className=' w-full max-w-5xl mt-17 mb-7' >
          <h2 className='small-medium md:base-medium text-light-2' >All User</h2>
        </div>
        <div className='user-grid' >
        {
          isLoading ? (<>
            loading.....
          </>) :
          filterPepole.map((e:any)=>{
            return(

              <User user={e} key={e.id} />
            )
            })
          }
          </div>

      </div>
  )
}

export default AllUsers
