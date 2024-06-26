
const Report = () => {
    const reasons = ["Harassment", "Copyright Violation", "Hate Speech", "Misinformation"]
  return (
    <div className='px-3 my-3'>
      <h1 className='text-center text-xl font-medium'>Community</h1>
      <h3 className='font-medium text-lg my-3'>Submit report *</h3>
      <h5 className='font-medium mb-3'>Reason for submitting report</h5>
      <div>
      {reasons.map((res, index) => (
          <div className='flex items-center gap-3 mb-4' key={res}>
            <input className='custom-checkbox1' id={`reason-${index}`} type='checkbox' />
            <label className='text-[#101010] text-md font-normal' htmlFor={`reason-${index}`}>{res}</label>
          </div>
          
        ))}
        <form>
            <label className='font-semibold text-lg'>Add a Comment</label>
            <textarea  className='w-full h-[160px] my-6 rounded-lg border border-[#3B3A3A] block'></textarea>
            <button
                className="bg-[#4268FB] py-2 px-5 cursor-pointer text-white font-normal rounded-md hover:bg-[#4248fb]-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
            >
                Submit Report
            </button>
        </form>
      </div>
    </div>
  )
}

export default Report
