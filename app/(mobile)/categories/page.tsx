import CategoriesPage from '@/components/template/mobile/CategoriesPage'
import { getCategory } from '@/service/getCategory'


const Categories =async () => {
    const getData = await getCategory();
   
  return (
  <>
  
  <CategoriesPage category={getData} />
  </>
  )
}

export default Categories
