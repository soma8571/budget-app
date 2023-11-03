import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';
import Filter from '../components/Filter';
import TypeFilter from '../components/TypeFilter';
import { categories } from '../utils';
import DateFilter from '../components/DateFilter';

export const Home = () => {

    const [items, setItems] = useState([]);
    const [cookies] = useCookies(["access_token"]);
    const [deletedID, setDeletedID] = useState("");
    const [catFilters, setCatFilters] = useState(() => {
        return categories.map(item => {
            return { "name": item, "visible": true }
        });
    });
    const [itemType, setItemType] = useState("both");
    const now = new Date();
    const thisYear = now.getFullYear();
    const filterStartDate = `${thisYear}-01-01`;
    const filterEndDate = `${thisYear}-12-31`;
    const [dateFilter, setDateFilter] = useState([
      filterStartDate, 
      filterEndDate
   ]);
    const [filteredItems, setFilteredItems] = useState([]);

    const userID = useGetUserID();

    useEffect(() => {

        const fetchItems = async () => {
            try {
                if (userID) {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/items/${userID}`, {
                        headers: { "Authorization": cookies.access_token }
                    });
                    setItems(response.data);
                    setFilteredItems(response.data);
                }

            } catch (err) {
                console.log(err);
            }
        }

        fetchItems();

    }, [deletedID, cookies.access_token]);


    //Táblázat fejléc
    function getTableHeading() {
        const heading = <thead>
            <tr>
                <th>Dátum</th>
                <th>Megnevezés</th>
                <th>Összeg</th>
                <th>Típus</th>
                <th>Kategória</th>
                <th>Művelet</th>
            </tr>
        </thead>
        return heading;
    }

    //format date to "YYYY-MM-DD"
    function formatDate(date) {
        if (date && date.length > 10)
            return date.substr(0, 10);
        else
            return date;
    }

    //Delete item
    function deleteItem(e) {
        e.preventDefault();
        let choice = window.confirm("Biztosan törölni akarja?");
        if (choice) {
            const itemID = e.target.dataset.id;
            try {
                axios.delete(`${process.env.REACT_APP_API_URL}/items/${itemID}`);
                setDeletedID(itemID);
            } catch (err) {
                console.log(err);
            }
        }
        return;

    }

    function applyFilters() {
        let where_category = "";

        //Végigiterálunk a kategória szűrők tömbjén és az értékek alapján
        //összeállítjuk a lekérdezéshez szükséges kartakterláncot
        catFilters.forEach(filter => {
            if (filter.visible === true) {
                where_category += `item.category === '${filter.name}' || `;
            }
        });

        if (where_category !== "")
            //ciklus után az 4 utolsó karakter levágása
            where_category = `(${where_category.slice(0, -4)})`;


        let where = "";
        //az aktuális típus alapján beállítjuk a típusra vonatkozó szűrési feltételt
        switch (itemType) {
            case "income":
                //a bevételek esetén nem fog számítani a kategória szűrő állapota, 
                //mivel azoknak nem lehet kat.-ja, így csak egyszerűen a bevételekre szűrünk
                where = "item.type === 'income'";
                break;

            case "outcome":
                //ha csak a kiadások: akkor CSAK a kategória szűrők állapota számít
                //ha azoban ez üres (minden checkbox false), akkor egyszerűen kizárjuk mindkét típust
                if (where_category === "")
                    where = "(item.type !== 'income' && item.type !== 'outcome')";
                else
                    where = where_category + " && (item.type === 'outcome')";
                break;

            default:
                //ha a "mindegyik" típus van kiválasztva, akkor a kategória szűrők "megszűrik" 
                //a kiadásokat és ehhez VAGY-al kell hozzáfűzni a bevételeket

                //ha minden kategória szűrő false, akkor viszont csak a bevételek jelenjenek meg
                if (where_category === "")
                    where = "item.type === 'income'";
                else
                    where = `((${where_category}) || (item.type === 'income'))`;
                break;
        }

        //Dátum szűrő
        where += ` && (item.date >= '${dateFilter[0]}' && item.date <= '${dateFilter[1]}')`;
        //console.log(where);

        const filtered = items.filter(item => eval(where));
        sorting(filtered);
        setFilteredItems(filtered);
    }


    //Calculate the sum of items
    function getItemsSum() {
        const total = filteredItems.reduce((sum, current) =>
            current.type === "income" ? sum + current.amount : sum - current.amount
            , 0);

        return currencyFormat(total);
    }

    //Format amount number to Currency format
    function currencyFormat(value) {
        const formatter = new Intl.NumberFormat('hu-HU', {
            style: 'currency',
            currency: 'HUF',
            maximumFractionDigits: 0
        });
        return formatter.format(value);
    }

    //Típus formázás/fordítás
    function typeFormatter(type) {
        if (type === "income")
            return "Bevétel";
        else
            return "Kiadás";
    }

    //Sort the items according to its date ascend
    function sorting(arrayToSort) {
        arrayToSort.sort((a, b) => {
            const nameA = a.date.toLowerCase();
            const nameB = b.date.toLowerCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });
    }

    //Kategória szűrő módosításának kezelése
    function handleCatFilterChange(cat_name, visible) {

        setCatFilters(currentFilters => {
            return currentFilters.map(filter => {
                if (filter.name === cat_name)
                    return { ...filter, visible }
                else
                    return filter;
            })
        });
    }

    //Típus szűrő módosulása
    function handleTypeFilterChange(value) {
        setItemType(value);
    }

    //Dátum szűrő módosulása
    function handleDateChange(whichDate, date) {
        if (whichDate === "start")
            setDateFilter([date, dateFilter[1]]);
        else
            setDateFilter([dateFilter[0], date]);
    }

    //Ha bármelyik szűrő állapota megváltozik, akkor az applyFilters-el
    //frissítjük a szűrt elemeket
    useEffect(() => {
        applyFilters();
    }, [catFilters, itemType, dateFilter]);

   function getTableContent() {
      let tbody = 
         <tbody>
            {filteredItems.map(item =>
               (<tr key={item._id}>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.name}</td>
                  <td style={{ textAlign: "right" }}>
                     {item.type === "outcome" ? currencyFormat(0 - item.amount) : currencyFormat(item.amount)}
                  </td>
                  <td>{typeFormatter(item.type)}</td>
                  <td>{item.category}</td>
                  <td className="action">
                     <a href="#delete"
                        className="del"
                        onClick={deleteItem}
                        data-id={item._id}
                     >Törlés
                     </a>
                  </td>
               </tr>)
            )}
            <tr>
               <td colSpan={2}>Egyenleg:</td>
               <td colSpan={4}>{getItemsSum()}</td>
            </tr>
         </tbody>;
      return tbody;
   } 
   

   return (
   <>
      <div className="main">
         {cookies.access_token ?
         (filteredItems.length > 0 ?
            (<><h1>Pénzügyi tételek</h1>
               <table className="budget-items">
                  {getTableHeading()}
                  {getTableContent()}
               </table>
            </>
            )
            :
            (items.length > 0 ?
               (<div>Nincs a beállított szűrőknek megfelelő találat.</div>)
               :
               (<div>Még nem rögzítettél tételt.</div>)
            )
         )
         :
         (<><h1>Üdvözöllek,</h1>
            <div>ezen alkalmazás segítségével könnyedén követheted pénzügyeidet!</div>
         </>
         )}
      </div>

      {items.length > 0 &&
         <div className="filterContainer">
            <Filter
               catFilters={catFilters}
               handleChange={handleCatFilterChange}
            />
            <div style={{ margin: "1.5rem 0 0 0" }}>
               <TypeFilter itemType={itemType} handleTypeChange={handleTypeFilterChange} />
            </div>
            <div style={{ margin: "1.5rem 0 0 0" }}>
               <DateFilter dates={dateFilter} handleDateChange={handleDateChange} />
            </div>
         </div>
      }
   </>
);

};
