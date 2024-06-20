interface Row {
    city: string;
    // got
    date: string;
    // got
    dateAndTime: string;
    // got
    description: string;
    // optional
    email: string;
    // get
    location: string;
    // got
    name: string;
    // get
    phoneNumber: string;
    // get
    slug: string;
    // got
    time: string;
    // got
}

export type Incidents = Array<Row>