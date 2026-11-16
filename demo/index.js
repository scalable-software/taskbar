import { Taskbar } from "@scalable.software/taskbar";

await Taskbar.Template.load("taskbar.template.html");

customElements.define(Taskbar.Tag, Taskbar);
