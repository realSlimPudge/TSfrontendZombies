import {Link} from 'react-router-dom';
import Header from '../../Components/Header/Header';
import styles from './Faculties.module.scss';


const Faculties: React.FC = () => {
  
  const faculties = [
    { id: 'ИиВТ', name: 'ИиВТ'},
    { id: 'ИБиМ', name: 'ИБиМ'},
    { id: 'ИВО', name: 'ИВО'},
    { id: 'ИФКиС', name: 'ИФКиС'}
  ];

  return (
    <div>
      <h1>
        Выберите факультет
      </h1>
      <div>
        {faculties.map((faculty) => ( 
          <Link key = {faculty.id} to={`/roadmap/${faculty.id}`}>{faculty.name}</Link>
        ))}
      </div>
    </div>
  )
}

export default Faculties;