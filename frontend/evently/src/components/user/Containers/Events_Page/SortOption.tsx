const SortOption = () => {
    
    return (
        <div className="mb-4 flex items-center justify-end">
            <select id="sort" className="border p-2 rounded-md focus:outline-none">
                <option value="">Default</option>
                <option value="hackthon">Hackthon</option>
                <option value="webinar">Webinar</option>
                <option value="meetup">Meetup</option>
                <option value="challenge">Challenge</option>
                <option value="workshop">Workshop</option>
            </select>
        </div>
    )
}

export default SortOption
