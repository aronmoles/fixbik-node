/**
 * @openapi
 * /notification:
 *     post:
 *       operationId: addJob
 *       tags:
 *         - jobs
 *       summary: Creates a new notification.
 *       description: ''
 *       security:
 *         - jwt: []
 *       requestBody:
 *         description: "Notification object to create"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       responses:
 *         201:
 *           description: "Successful operation. The notification has been created on the server."
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Notification'
 *         400:
 *           description: "Bad Request"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
