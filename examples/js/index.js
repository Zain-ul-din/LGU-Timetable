const baseUrl = "https://www.lgutimetable.live";
const apiKey = "add_your_api_key";

const endPoints = {
    metadata: `${baseUrl}/api/public/metadata?apikey=${apiKey}`,
    timetable: `${baseUrl}/api/public/timetable?apikey=${apiKey}`
}

const payload = {
    semester: "1st Semester Sp-2023 / Sp-2023".trim(),
    program: "MPhil Microbiology".trim(),
    section: "Sec A".trim()
}

// Request metadata
axios.get(endPoints.metadata).then(res=> console.log(res.data))

// Request timetable
axios.post(endPoints.timetable, payload).then(res=> console.log(res.data))

