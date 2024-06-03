import AddYear from "../components/forms/AddYear";
import '../assets/forms/addData.scss'
import AddCategory from "../components/forms/AddCategory";
import AddSubCategory from "../components/forms/AddSubCategory";
import AddDailyCost from "../components/forms/AddDailyCost";
import AddMonthlyCost from "../components/forms/AddMonthlyCost";
import AddWorkDays from "../components/forms/AddWorkDays";
import AddCategorySales from "../components/forms/AddCategorySales";

const AddDataForms = () => {
  
  return ( 
    <div className="forms">
      <AddYear />
      <AddCategory />
      <AddSubCategory />
      <AddDailyCost />
      <AddMonthlyCost />
      <AddWorkDays />
      <AddCategorySales />
    </div>
   );
}
 
export default AddDataForms;