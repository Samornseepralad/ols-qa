# Tasks: ols-skill-fixes

> Mirror of `Thitic9203/pluton-ai-agent` `docs/sdd/ols-skill-fixes/` (source of truth there, merged via pluton-ai-agent#79), kept here so ols-qa commits can cite it (`tools/sdd-gate`).

1. **T1 (R12-1, R12-2)** ต่อข้อความ R12 ในแถว MUST/NEVER เดิม · เทสต์ก่อน: `grep -c "no source" ` บนไฟล์ต้นฉบับ = 0 · เสร็จเมื่อ diff apply ได้และ link-check ผ่าน — **ทำแล้ว ols-qa#115**
2. **T2 (R14-1..4)** เพิ่ม Step 8 + checklist + 3 แถว MUST/NEVER (ใช้ `{TICKET_KEY}`) · เทสต์ก่อน: `grep "Step 8"` บนต้นฉบับ = 0 · เสร็จเมื่อ diff apply ได้ ผ่าน link-check/no-secrets — **ทำแล้ว ols-qa#115**
3. **T3** เจ้าของงานรีวิว+merge #115 → เช็ก diff D11 → รัน `sync-skills-to-helix.sh` — **เจ้าของงานเป็นผู้สั่ง**
4. **T4 (แยกงาน)** ให้ worker/tick ฝั่งนี้ตรวจว่ามี `data-register.md` และ verdict Unverified ในผลรีวิว — ยังไม่ทำ จนกว่า T3 เสร็จ
