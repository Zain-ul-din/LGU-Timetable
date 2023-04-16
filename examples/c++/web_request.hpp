#ifndef WEB_REQUEST_HPP
#define WEB_REQUEST_HPP

#include <iostream>
#include <string>
#include <sstream>
#include <curl/curl.h>


class IQuery 
{
    public:
        virtual std::string to_json() = 0;

        static std::string json_entry(std::string key, std::string val)
        {
            return "\"" + key + "\": " "\"" + val + "\",\n";
        }
};

#define VAR_NAME(X) #X

class TimetableQuery: public IQuery 
{
    public:

        TimetableQuery(std::string semester, std::string program, std::string section):
            semester(semester), program(program), section(section) {}

        std::string semester, program, section;
        std::string to_json() override 
        {
            return "{\n"+ 
                IQuery::json_entry(VAR_NAME(semester), semester) +
                IQuery::json_entry(VAR_NAME(program), semester)  +
                IQuery::json_entry(VAR_NAME(section), semester)  +
            "\n}";
        }
};

class WebRequest 
{
public:
    
    WebRequest(const std::string& url): url(url), curl(curl_easy_init())
    {}

    ~WebRequest()
    {
        curl_easy_cleanup(curl);
    }

    void make_request()
    {
        if (!curl) return;
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Accept: application/json");
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "charset: utf-8");


        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers); 
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L); // follow redirects
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WebRequest::write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

        if (!request_body.empty())
        {
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, request_body.c_str());
            curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, request_body.length());
            curl_easy_setopt(curl, CURLOPT_POST, 1);
        }

        CURLcode res = curl_easy_perform(curl);
        if (res != CURLE_OK)
        {
            std::cerr << "curl_easy_perform() failed: " 
                << curl_easy_strerror(res) << std::endl;
        }
    }

    const std::string& request_response()
    {
        return this->response;
    }

    void set_request_body(IQuery& query)
    {
        this->request_body = query.to_json();
    }

    static std::string json_pair(const std::string key, const std::string val, bool add_comma = true)
    {
        return "\n\"" + key + "\"" + ": " + "\"" + val + "\"" + (add_comma ? ",\n" : "\n");
    }

private:
    std::string url;
    std::string request_body;
    CURL* curl;
    std::string response;

    static size_t write_callback(void *contents, size_t size, size_t nmemb, void *userp)
    {
        ((std::string*)userp)->append((char*)contents, size * nmemb);
        return size * nmemb;
    }

};

#endif