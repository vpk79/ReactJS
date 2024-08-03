
export default function TestemonialCard({data}){
    // console.log(data);
    // console.log(data.name);
    // console.log(data.img);
    // console.log(data.data);
    return (
        <>
            <div className="testimonial-item text-center">
                <img
                    className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                    src={data.img}
                    alt="Patient 1"
                    style={{ width: 100, height: 100 }}
                />
                <div className="testimonial-text rounded text-center p-4">
                    <p>{data.comment}</p>
                    <h5 className="mb-1">{data.name}</h5>
                    <span className="fst-italic">{data.profession}</span>
                </div>
            </div>
        </>
    )
}