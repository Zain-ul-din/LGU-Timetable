#include "web_request.hpp"

using namespace std;

int main() 
{
    const string api_key = "add_your_key";
    const string base_url = "https://www.lgutimetable.online";
    const string metadata_url = base_url + "/api/metadata?apikey=" + api_key;
    const string timetable_url = base_url + "/api/public/timetable?apikey=" + api_key;
    
    // Request metadata data
    WebRequest metadata_request(metadata_url);
    metadata_request.make_request();
    cout << "Metadata response: " << metadata_request.request_response() << endl;

    // Request timetable data
    TimetableQuery query{"1st Semester Sp-2023 / Sp-2023", "MPhil Microbiology", "Sec A"};
    WebRequest timetable_request(timetable_url);
    timetable_request.set_request_body(query);
    timetable_request.make_request();
    cout << "Timetable response: " << timetable_request.request_response() << endl;
    
    return 0;
}

