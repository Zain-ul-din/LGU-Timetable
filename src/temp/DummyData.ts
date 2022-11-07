import type { IApisResponse } from "../types/typedef"

export const apiData: IApisResponse =
{
    "Monday": [
        {
          "startTime": {
            "hours": 9,
            "minutes": 30
          },
          "endTime": {
            "hours": 11,
            "minutes": 0
          },
          "subject": "Multivariate Calculus",
          "roomNo": "Room 18 NB ",
          "teacher": "Rubina Shuaib "
        },
        {
          "startTime": {
            "hours": 11,
            "minutes": 0
          },
          "endTime": {
            "hours": 12,
            "minutes": 30
          },
          "subject": "Technical and Business Writing",
          "roomNo": "Room 05 NB ",
          "teacher": "Naseer Ahmed "
        },
        {
          "startTime": {
            "hours": 12,
            "minutes": 30
          },
          "endTime": {
            "hours": 14,
            "minutes": 0
          },
          "subject": "Compiler Construction",
          "roomNo": "Lab 18 OB ",
          "teacher": "Muhammad Basit Ali Gillani "
        }
      ],
      "Tuesday": [
        {
          "startTime": {
            "hours": 9,
            "minutes": 30
          },
          "endTime": {
            "hours": 11,
            "minutes": 0
          },
          "subject": "Multivariate Calculus",
          "roomNo": "Room 10 NB ",
          "teacher": "Rubina Shuaib "
        },
        {
          "startTime": {
            "hours": 11,
            "minutes": 0
          },
          "endTime": {
            "hours": 12,
            "minutes": 30
          },
          "subject": "Technical and Business Writing",
          "roomNo": "Room 05 NB ",
          "teacher": "Naseer Ahmed "
        },
        {
          "startTime": {
            "hours": 12,
            "minutes": 30
          },
          "endTime": {
            "hours": 14,
            "minutes": 0
          },
          "subject": "Compiler Construction",
          "roomNo": "Lab 52 OB ",
          "teacher": "Muhammad Basit Ali Gillani "
        }
      ],
      "Wednesday": [
        {
          "startTime": {
            "hours": 8,
            "minutes": 0
          },
          "endTime": {
            "hours": 9,
            "minutes": 30
          },
          "subject": "Operating Systems",
          "roomNo": "Lab 18 OB ",
          "teacher": "Sundus Munir "
        },
        {
          "startTime": {
            "hours": 9,
            "minutes": 30
          },
          "endTime": {
            "hours": 11,
            "minutes": 0
          },
          "subject": "Software Engineering",
          "roomNo": "Lab 58 OB ",
          "teacher": "Addul rehman "
        },
        {
          "startTime": {
            "hours": 11,
            "minutes": 0
          },
          "endTime": {
            "hours": 12,
            "minutes": 30
          },
          "subject": "Operating Systems Lab",
          "roomNo": "Lab 79 OB ",
          "teacher": "Muhammad Mugees Asif "
        }
      ],
      "Thursday": [
        {
          "startTime": {
            "hours": 8,
            "minutes": 0
          },
          "endTime": {
            "hours": 9,
            "minutes": 30
          },
          "subject": "Operating Systems",
          "roomNo": "Lab 55 OB ",
          "teacher": "Sundus Munir "
        },
        {
          "startTime": {
            "hours": 9,
            "minutes": 30
          },
          "endTime": {
            "hours": 11,
            "minutes": 0
          },
          "subject": "Software Engineering",
          "roomNo": "Lab 21 OB ",
          "teacher": "Addul rehman "
        },
        {
          "startTime": {
            "hours": 11,
            "minutes": 0
          },
          "endTime": {
            "hours": 12,
            "minutes": 30
          },
          "subject": "Operating Systems Lab",
          "roomNo": "Lab 79 OB ",
          "teacher": "Muhammad Mugees Asif "
        }
    ]
}



export function ApiData (): IApisResponse
{
	return {
		Monday:    apiData ['Monday'],
		Tuesday:   apiData ['Tuesday'],
		Wednesday: apiData ['Wednesday'],
		Thursday:  apiData ['Thursday'],
		Friday:    apiData ['Friday'],
		Saturday:  apiData ['Saturday'],
		Sunday:    apiData ['Sunday'],
	}
}

// 20221107184425
// https://lgu-timetable-api.deta.dev/metadata

const metaDataRes = {
  "3rd Semester Fall-2022 / Fall-2021": [
    {
      "degree": "BSIT",
      "section": "A"
    },
    {
      "degree": "BSIT",
      "section": "B"
    },
    {
      "degree": "BSSE",
      "section": "C"
    },
    {
      "degree": "BSSE",
      "section": "E"
    },
    {
      "degree": "BSSE",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "D"
    },
    {
      "degree": "BSSE",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "G"
    },
    {
      "degree": "BSCS",
      "section": "D"
    },
    {
      "degree": "BSCS",
      "section": "F"
    },
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSCS",
      "section": "H"
    },
    {
      "degree": "BSCS",
      "section": "C"
    },
    {
      "degree": "BSCS",
      "section": "E"
    },
    {
      "degree": "BSCS",
      "section": "I"
    },
    {
      "degree": "BBA (Hons)",
      "section": "C"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "B"
    },
    {
      "degree": "BBA (Hons)",
      "section": "D"
    },
    {
      "degree": "BS URDU",
      "section": "A"
    },
    {
      "degree": "BS URDU",
      "section": "B"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "A"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "B"
    },
    {
      "degree": "MS Clinical Psychology",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "B"
    },
    {
      "degree": "MPhil Microbiology",
      "section": "A"
    },
    {
      "degree": "M.Phil Zoology",
      "section": "A"
    },
    {
      "degree": "BS Microbiology",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "A"
    },
    {
      "degree": "BS Chemistry",
      "section": "A"
    },
    {
      "degree": "BS (Mathematics)",
      "section": "A"
    },
    {
      "degree": "BS Physics",
      "section": "A"
    },
    {
      "degree": "MSCS",
      "section": "A"
    },
    {
      "degree": "BSIR III",
      "section": "A"
    },
    {
      "degree": "BS DFCS",
      "section": "A"
    },
    {
      "degree": "BS DFCS",
      "section": "B"
    },
    {
      "degree": "BSAF",
      "section": "A"
    },
    {
      "degree": "MSIT",
      "section": "A"
    },
    {
      "degree": "MBA Eco Crime  Fraud Investigation",
      "section": "A"
    },
    {
      "degree": "MBA",
      "section": "B"
    },
    {
      "degree": "MBA",
      "section": "A"
    },
    {
      "degree": "MBA",
      "section": "C"
    },
    {
      "degree": "BS English",
      "section": "A"
    },
    {
      "degree": "BS English",
      "section": "B"
    }
  ],
  "4th Semester Fall-2022 / Spring-2021": [
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSIT",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "B"
    },
    {
      "degree": "MSCS",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "B"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    },
    {
      "degree": "BS English",
      "section": "A"
    },
    {
      "degree": "MBA",
      "section": "C"
    },
    {
      "degree": "MBA",
      "section": "B"
    },
    {
      "degree": "MBA",
      "section": "A"
    }
  ],
  "5th Semester Fall-2022 / Fall-2020": [
    {
      "degree": "BSSE",
      "section": "E"
    },
    {
      "degree": "BSSE",
      "section": "D"
    },
    {
      "degree": "BSSE",
      "section": "C"
    },
    {
      "degree": "BSSE",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "E"
    },
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSCS",
      "section": "F"
    },
    {
      "degree": "BSCS",
      "section": "H"
    },
    {
      "degree": "BSCS",
      "section": "I"
    },
    {
      "degree": "BSCS",
      "section": "G"
    },
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "C"
    },
    {
      "degree": "BSCS",
      "section": "J"
    },
    {
      "degree": "BSCS",
      "section": "D"
    },
    {
      "degree": "BBA (Hons)",
      "section": "C"
    },
    {
      "degree": "BBA (Hons)",
      "section": "D"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "B"
    },
    {
      "degree": "BSIT",
      "section": "B"
    },
    {
      "degree": "BSIT",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "B"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "A"
    },
    {
      "degree": "BS Zoology",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "A"
    },
    {
      "degree": "BS Chemistry",
      "section": "A"
    },
    {
      "degree": "BS (Mathematics)",
      "section": "A"
    },
    {
      "degree": "BS DFCS",
      "section": "A"
    },
    {
      "degree": "BS Physics",
      "section": "A"
    },
    {
      "degree": "BS English",
      "section": "A"
    },
    {
      "degree": "BS English",
      "section": "B"
    },
    {
      "degree": "BSAF",
      "section": "A"
    },
    {
      "degree": "BSIR_V",
      "section": "A"
    },
    {
      "degree": "BS Microbiology",
      "section": "A"
    },
    {
      "degree": "BS Biochemistry",
      "section": "A"
    }
  ],
  "6th Semester Fall-2022 / Spring-2020": [
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSIT",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    },
    {
      "degree": "BS English",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "A"
    }
  ],
  "7th Semester Fall-2022 / Fall-2019": [
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSCS",
      "section": "C"
    },
    {
      "degree": "BSCS",
      "section": "E"
    },
    {
      "degree": "BSCS",
      "section": "F"
    },
    {
      "degree": "BSCS",
      "section": "H"
    },
    {
      "degree": "BSCS",
      "section": "D"
    },
    {
      "degree": "BSCS",
      "section": "G"
    },
    {
      "degree": "BSCS",
      "section": "I"
    },
    {
      "degree": "BS (Mathematics)",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "B"
    },
    {
      "degree": "BSSE",
      "section": "D"
    },
    {
      "degree": "BSSE",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "C"
    },
    {
      "degree": "BSSE",
      "section": "B"
    },
    {
      "degree": "BBA (Hons)",
      "section": "D"
    },
    {
      "degree": "BBA (Hons)",
      "section": "B"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "C"
    },
    {
      "degree": "BBA (Hons)",
      "section": "E"
    },
    {
      "degree": "BS Chemistry",
      "section": "A"
    },
    {
      "degree": "BS Chemistry",
      "section": "B"
    },
    {
      "degree": "BSIT",
      "section": "B"
    },
    {
      "degree": "BSIT",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "A"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "B"
    },
    {
      "degree": "BS Microbiology",
      "section": "A"
    },
    {
      "degree": "BS DFCS",
      "section": "A"
    },
    {
      "degree": "BS English",
      "section": "A"
    },
    {
      "degree": "BS Physics",
      "section": "A"
    }
  ],
  "1st Semester Fall-2022 / Fall-2022": [
    {
      "degree": "BS Applied Psychology",
      "section": "A"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "B"
    },
    {
      "degree": "MS Clinical Psychology",
      "section": "A"
    },
    {
      "degree": "BSIT",
      "section": "B"
    },
    {
      "degree": "BSIT",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "E"
    },
    {
      "degree": "BSSE",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "B"
    },
    {
      "degree": "BSSE",
      "section": "C"
    },
    {
      "degree": "BSSE",
      "section": "D"
    },
    {
      "degree": "BSCS",
      "section": "E"
    },
    {
      "degree": "BSCS",
      "section": "G"
    },
    {
      "degree": "BSCS",
      "section": "H"
    },
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "D"
    },
    {
      "degree": "BSCS",
      "section": "C"
    },
    {
      "degree": "BSCS",
      "section": "J"
    },
    {
      "degree": "BSCS",
      "section": "I"
    },
    {
      "degree": "BSCS",
      "section": "F"
    },
    {
      "degree": "MSCS",
      "section": "A"
    },
    {
      "degree": "MBA",
      "section": "B"
    },
    {
      "degree": "MBA",
      "section": "A"
    },
    {
      "degree": "BS URDU",
      "section": "A"
    },
    {
      "degree": "MPhil Applied Psychology",
      "section": "A"
    },
    {
      "degree": "M.Phil Islamic Studies",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "B"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "MPhil Microbiology",
      "section": "A"
    },
    {
      "degree": "BS Zoology",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "A"
    },
    {
      "degree": "M.Phil Chemistry",
      "section": "A"
    },
    {
      "degree": "BS Biochemistry",
      "section": "A"
    },
    {
      "degree": "BS Microbiology",
      "section": "A"
    },
    {
      "degree": "BS Chemistry",
      "section": "A"
    },
    {
      "degree": "M.Phil Zoology",
      "section": "A"
    },
    {
      "degree": "M. Phil Mathematics",
      "section": "A"
    },
    {
      "degree": "BS (Mathematics)",
      "section": "A"
    },
    {
      "degree": "BS Physics",
      "section": "A"
    },
    {
      "degree": "M. Phil Physics",
      "section": "A"
    },
    {
      "degree": "BS English",
      "section": "A"
    },
    {
      "degree": "MPhil English",
      "section": "A"
    },
    {
      "degree": "MSBA",
      "section": "A"
    },
    {
      "degree": "MSBA",
      "section": "B"
    },
    {
      "degree": "BSIR",
      "section": "A"
    },
    {
      "degree": "BS DFCS",
      "section": "B"
    },
    {
      "degree": "BS DFCS",
      "section": "A"
    },
    {
      "degree": "WCCI",
      "section": "A"
    },
    {
      "degree": "MSIT",
      "section": "A"
    },
    {
      "degree": "MPHIL IR  I",
      "section": "A"
    },
    {
      "degree": "BS Clinical Psychology",
      "section": "A"
    },
    {
      "degree": "BSAF",
      "section": "A"
    },
    {
      "degree": "MBA Eco Crime  Fraud Investigation",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    },
    {
      "degree": "MS/MPhil Mass Comm",
      "section": "A"
    }
  ],
  "Extra Enrolled Semester-Fall-2022": [
    {
      "degree": "BS Microbiology",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "A"
    },
    {
      "degree": "BS Zoology",
      "section": "A"
    }
  ],
  "2nd Semester Fall-2022 / Spring-2022": [
    {
      "degree": "BSIT",
      "section": "A"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "A"
    },
    {
      "degree": "BSSE",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSCS",
      "section": "C"
    },
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSCS",
      "section": "D"
    },
    {
      "degree": "MSCS",
      "section": "A"
    },
    {
      "degree": "M. Phil Mathematics",
      "section": "A"
    },
    {
      "degree": "BS Applied Psychology",
      "section": "A"
    },
    {
      "degree": "MBA",
      "section": "A"
    },
    {
      "degree": "MBA",
      "section": "B"
    },
    {
      "degree": "MS Clinical Psychology",
      "section": "A"
    },
    {
      "degree": "MPhil English",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "BS Biotechnology",
      "section": "A"
    },
    {
      "degree": "MPhil Microbiology",
      "section": "A"
    },
    {
      "degree": "M.Phil Zoology",
      "section": "A"
    },
    {
      "degree": "BSAF",
      "section": "A"
    },
    {
      "degree": "DULLFS",
      "section": "A"
    },
    {
      "degree": "MSIT",
      "section": "A"
    },
    {
      "degree": "BS DFCS",
      "section": "A"
    },
    {
      "degree": "MSBA",
      "section": "A"
    },
    {
      "degree": "MSBA",
      "section": "C"
    },
    {
      "degree": "MSBA",
      "section": "B"
    }
  ],
  "8th Semester Fall-2022 / Spring-2019": [
    {
      "degree": "BSCS",
      "section": "A"
    },
    {
      "degree": "BSCS",
      "section": "B"
    },
    {
      "degree": "BSSE",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "C"
    },
    {
      "degree": "BBA (Hons)",
      "section": "D"
    },
    {
      "degree": "BBA (Hons)",
      "section": "E"
    },
    {
      "degree": "BBA (Hons)",
      "section": "A"
    },
    {
      "degree": "BBA (Hons)",
      "section": "B"
    },
    {
      "degree": "BS Mass Comm",
      "section": "A"
    }
  ]
}

function filterData (metaData: any): any
{
   var res: any = {} 
   Array.from (Object.keys (metaData)).forEach ( key => {
       let nestedFilter: any = {}
       Array.from (Object.values (metaData [key])).forEach ( (val:any) => {
           if (nestedFilter [val.degree] == undefined) nestedFilter [val.degree] = []
           nestedFilter [val.degree].push (val.section)
       })
       res [key] = nestedFilter
   })
   return res 
}

export const metaData = filterData (metaDataRes)
