import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Link, Paper, Typography } from '@mui/material';
import Addtask from '../Addtask/Addtask';
import Addmember from '../Addmember/Addmember';
import './mainpage.css';
import Addmeeting from "../Addmeeting/Addmeeting";
import CollatedCalendar from "../CollatedCalendar/CollatedCalendar";
import ClearIcon from '@mui/icons-material/Clear';


function Mainpage() {
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [meetings, setMeetings] = useState([{ "title": "meeting 1", "date": new Date("2023-3-1"), "time": "9:00 PM", "link": "zoom.com", "pwd": "1234" }]);

    //retrieve from backend
    const deletetask = (e) => {
        const temp = [...tasks];
        const tempC = [...completed, e.target.name];
        console.log(temp.indexOf(e.target.value), "index");
        temp.splice(temp.indexOf(e.target.value), 1);
        setTasks(temp);
        setCompleted(tempC);
    }

    const deletemeeting = (e) => {
        const temp = [...meetings];
        temp.splice(temp.indexOf(e.target.value), 1);
        setMeetings(temp);
    }

    const addTask = (e) => {
        const f = new FormData(e.target);
        const temp = [...tasks, f.get("description")];
        setTasks(temp);
    }

    const addMeeting = (e) => {
        const f = new FormData(e.target);
        const obj = {"title": f.get("title"), "date":new Date(f.get("date")), "time":f.get("time"), "link":f.get("link"), "pwd":f.get("pwd")};
        const temp = [...meetings, obj];
        setMeetings(temp);
    }

    return (
        <div className='main-wrapper'>
            <h1 className='project-title'>Project Jiraji</h1>
            <p className='project-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum turpis quis iaculis condimentum. Vestibulum euismod, ex vitae convallis porta, odio magna venenatis mauris, eget pellentesque velit ante eu erat. Praesent ac tincidunt nunc. Donec enim lectus, malesuada porta imperdiet ultrices, mollis in ipsum. Duis euismod, sapien quis tincidunt consectetur, metus lectus placerat massa, a malesuada nisi massa vel quam. Integer euismod ut lectus eu bibendum. Duis nec lobortis magna. Phasellus augue metus, maximus vitae malesuada sit amet, sagittis sit amet lectus. Duis venenatis bibendum risus. Phasellus fringilla erat id ipsum scelerisque hendrerit. Vestibulum ac mi vel nisi viverra finibus quis sed magna.</p>
            <div className='btn-wrapper'>
                <Addtask addTask={addTask}/>
                <Addmember />
                <Addmeeting addMeeting={addMeeting}/>
            </div>
            <div className='kanban-board'>
                <Paper className='single-board' elevation={2}>
                    <div className='board-title'>To-do</div>
                    <div className='board-content'>
                            {tasks.map(x => {
                                return (
                                    <div>
                                        <FormControlLabel value={x} control={<Checkbox value={x} checked={false} name={x} onChange={deletetask} />} label={x} />
                                        {/* <div>
                                        <Typography fontSize={9}>Due: {x.date}</Typography>
                                        <Typography fontSize={9}>Assigned: {x.assigned}</Typography>
                                        </div> */}
                                    </div>
                                )
                            })}
                    </div>
                </Paper>
                <Paper className='single-board' elevation={2}>
                    <div className='board-title'>Completed</div>
                    <div className='board-content'>
                        {completed.map(c => {
                            return (
                                
                                <Typography sx={{ textDecoration: "line-through" }}>{c}</Typography>
                            )
                        })}
                    </div>
                </Paper>
                <Paper className="single-board-meeting" elevation={2}>
                    <div className="board-title">Upcoming meetings</div>
                    <div className="board-content">
                        <FormGroup row={false}>
                            {meetings.map(x => {
                                const now = new Date();
                                console.log(x.date.getDate())
                                if (x.date.getMonth() > now.getMonth() || (x.date.getMonth() === now.getMonth() && x.date.getDate() >= now.getDate())) {
                                    return (
                                        <div>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <Checkbox icon={<ClearIcon/>} value={x} checked={false} name={x} onChange={deletemeeting} />
                                                <Typography variant="h4" >{x.title}</Typography>
                                            </div>
                                            <Typography variant="h5" >{x.time}</Typography>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <Link variant="h7" href={x.link}>Meeting link</Link>
                                                <Typography variant="h7">Password: {x.pwd}</Typography>
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </FormGroup>
                    </div>
                </Paper>
            </div>
            <CollatedCalendar />
        </div>
    )
}

export default Mainpage;
