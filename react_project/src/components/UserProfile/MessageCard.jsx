
export default function MessageCard({data}){
    const email = data.Email;
    const subject = data.Subject;
    const date = data._createdOn;
    const id = data._id;

    const newDate = new Date(date);
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

    const formattedDate = `${addLeadingZero(day)}:${addLeadingZero(month)}:${year}`;
    
    return(
        <>
            <li 
                id={id}
                className='col-12 d-block border btn'>
                <input type="checkbox" className='col-1' id={id} />
                <span className='col-1 d-inline-block' id={id}>
                    <i className="far fa-envelope" id={id}></i></span>
                <span className='col-3 d-inline-block' id={id}>{email}</span>
                <span className='col-5 d-inline-block' id={id}>{subject}</span>
                <span className='col-1 d-inline-block' id={id}>{formattedDate}</span>
                <span className='col-1 d-inline-block' id={id}>{hour}:{minutes}</span>
            </li>
        </>
    )
}